import "./Home.scss";
import SearchBar from "../../common/SearchBar/SearchBar";
import RecipeCard from "../../common/RecipeCard/RecipeCard";
import OpenAI from "openai";
import { sleep } from "openai/core";
import { useState } from "react";
import Spinner from "../../common/Spinner/Spinner";


const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const callOpenAI = async (query) => {
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

    while (run.status != "completed") {
      setIsLoading(true);
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log("wait ", run.status);
      await sleep(1000);
    }

    setIsLoading(false);

    const message_response = await openai.beta.threads.messages.list(thread.id);
    const messages = message_response.data;

    const latest_message = messages[0];
    console.log(latest_message.content[0].text.value);
    const parsedResponse = JSON.parse(latest_message.content[0].text.value);
    setResponse(parsedResponse);


    // console.log("calling openai");
    // await fetch("https://api.openai.com/v1/chat/completions",{
    //   method: "POST",
    //   headers: {
    //     "Content-Type":"application/json",
    //     "Authorization":"Bearer " + API_KEY
    //   },
    //   body: JSON.stringify({
    //     "assistant_id": "asst_ZJFqhmwdrTM4KHo0J1agFxlF",
    //     "messages": [{"role": "user", "content": "blueberry smoothie"}]
    //   })
    // }).then((data)=>{
    //   return data.json()
    // }).then((data)=>{
    //   console.log(data);
    // });

  };

  const onSearch = (query) => {
    console.log("call openai");
    callOpenAI(query);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="spinner-container">
          <Spinner shouldSpin={isLoading} />
        </div>
      );
    }

    if (!response || !response.recipes) {
      return (
        <div className="favorites-section">
          <h1>Favorites</h1>
          <div className="recipe-cards-container">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      );
    } else {
      console.log("THE RECIPES", response.recipes);
      return (
        <div className="suggested-recipes-section">
          <h1>Suggested recipes</h1>
          <div className="recipe-cards-container">
            {response.recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                time={recipe.time}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="content-container">
        <SearchBar onSearch={onSearch} />
        {renderContent()}
      </div>

    </>
  );
};

export default Home;
