import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import OpenAI from "openai";
import { sleep } from "openai/core";
import { normalizeTitle } from "../../utils/normalizeTitle";

const UNSPLASH_ACCESS_KEY = "SfeFdGzY5xvghCk6LgrYMhrgrhg0dwaJXmYb2HQEAuM";
const API_KEY = "sk-cH8dUilFiSq_43BrJCZNkUdt4bR-ORZFkR1YRVIW1pT3BlbkFJg-YTs1nXZfLpzzlvrdI77xy_fY-anD6YA3W3X8g4kA";
const ASSISTANT_ID = "asst_ZJFqhmwdrTM4KHo0J1agFxlF";
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });


export const callOpenAI = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { recipes: IRecipesState };
    let threadId = state.recipes.threadId;
    console.log("QUERY", query);

    try {
      console.log("MY THREAD", threadId);
      if (!threadId) {
        const thread = await openai.beta.threads.create();
        console.log("NEW THREAD CREATED", thread.id, "old: ", threadId);
        threadId = thread.id;
        dispatch(setThreadId(threadId));
      }

      const threadMessage = await openai.beta.threads.messages.create(
        threadId,
        { role: "user", content: query }
      );

      let run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: ASSISTANT_ID
      });

      while (run.status !== "completed") {
        run = await openai.beta.threads.runs.retrieve(threadId, run.id);
        console.log("wait ", run.status);
        await sleep(1000);
      }

      const message_response = await openai.beta.threads.messages.list(threadId);
      const messages = message_response.data;
      console.log("ALL MESSAGES", messages);

      const latest_message = messages[0];
      const parsedResponse = JSON.parse(latest_message.content[0].text.value);
      console.log("RESPONSE", parsedResponse);
      return parsedResponse;
    } catch (error) {
      console.error("Error in OpenAI API call", error);
      return rejectWithValue("Error fetching data from OpenAI");
    }
  }
);

export const fetchUnsplashPhoto = createAsyncThunk(
  "recipes/fetchUnsplashPhoto",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(title)}&per_page=1`, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photo from Unsplash");
      }

      const data = await response.json();
      console.log("FETCH PHOTO?", data);

      if (data.results && data.results.length > 0) {
        return data.results[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching Unsplash photo:", error);
      return rejectWithValue("Error fetching photo from Unsplash");
    }
  }
);

interface IRecipe {
  title: string;
  time: string;
  ingredients: string[];
  instructions: string;
}

interface IRecipesState {
  threadId: string;
  searchQuery: string;
  recipesList: IRecipe[];
  photos: any;
  currentRecipe: IRecipe | null;
  favorites: IRecipe[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IRecipesState = {
  threadId: "",
  searchQuery: "",
  recipesList: [],
  photos: {},
  currentRecipe: null,
  favorites: [],
  isLoading: false,
  error: null
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setThreadId: (state, action: PayloadAction<string>) => {
      state.threadId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentRecipe: (state, action: PayloadAction<IRecipe | null>) => {
      state.currentRecipe = action.payload;
    },
    clearRecipesList: (state) => {
      state.recipesList = initialState.recipesList;
    },
    setFavorites: (state, action: PayloadAction<IRecipe[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<IRecipe>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(recipe => recipe.title !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(callOpenAI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(callOpenAI.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.recipesList = action.payload.recipes;
      })
      .addCase(callOpenAI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUnsplashPhoto.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUnsplashPhoto.fulfilled, (state, action: PayloadAction<any>) => {
        const normalizedTitle = normalizeTitle(action.meta.arg);
        if (action.payload) {
          state.photos[normalizedTitle] = action.payload;
        }
        // state.isLoading = false;
      })
      .addCase(fetchUnsplashPhoto.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setThreadId,
  setSearchQuery,
  setIsLoading,
  setCurrentRecipe,
  clearRecipesList,
  setFavorites,
  addFavorite,
  removeFavorite
} = recipesSlice.actions;

export default recipesSlice.reducer;
