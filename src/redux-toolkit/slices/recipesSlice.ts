import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import OpenAI from "openai";
import { sleep } from "openai/core";

const API_KEY = "sk-cH8dUilFiSq_43BrJCZNkUdt4bR-ORZFkR1YRVIW1pT3BlbkFJg-YTs1nXZfLpzzlvrdI77xy_fY-anD6YA3W3X8g4kA";
const ASSISTANT_ID = "asst_ZJFqhmwdrTM4KHo0J1agFxlF";
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });


export const callOpenAI = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query: string, { rejectWithValue }) => {
    try {
      const thread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: query
          }
        ]
      });

      let run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID
      });

      while (run.status !== "completed") {
        run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        console.log("wait ", run.status);
        await sleep(1000);
      }

      const message_response = await openai.beta.threads.messages.list(thread.id);
      const messages = message_response.data;

      const latest_message = messages[0];
      const parsedResponse = JSON.parse(latest_message.content[0].text.value);
      return parsedResponse;
    } catch (error) {
      console.error("Error in OpenAI API call", error);
      return rejectWithValue("Error fetching data from OpenAI");
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
  searchQuery: string;
  recipesList: IRecipe[];
  currentRecipe: IRecipe | null;
  favorites: IRecipe[];
}

const initialState: IRecipesState = {
  searchQuery: "",
  recipesList: [],
  currentRecipe: null,
  favorites: []
};


export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<any>) => {
      state.searchQuery = action.payload;
    },
    setCurrentRecipe: (state, action: PayloadAction<any>) => {
      state.currentRecipe = action.payload;
    },
    clearRecipesList: (state) => {
      state.recipesList = initialState.recipesList;
    },
    loadFavoritesFromLocalStorage: (state) => {
      const savedRecipes: IRecipe[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("recipe_")) {
          const recipe = localStorage.getItem(key);
          if (recipe) {
            savedRecipes.push(JSON.parse(recipe));
          }
        }
      }

      state.favorites = savedRecipes;
    },
    addFavorite: (state, action: PayloadAction<IRecipe>) => {
      state.favorites.push(action.payload);
      localStorage.setItem(`recipe_${action.payload.title}`, JSON.stringify(action.payload));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(recipe => recipe.title !== action.payload);
      localStorage.removeItem(`recipe_${action.payload}`);
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
      });
  }
});

export const {
  setSearchQuery,
  setCurrentRecipe,
  clearRecipesList,
  loadFavoritesFromLocalStorage,
  addFavorite,
  removeFavorite
} = recipesSlice.actions;

export default recipesSlice.reducer;
