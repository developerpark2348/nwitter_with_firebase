import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {

    const [nweet, setNweet] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet: nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { target: {value}} = event;
        setNweet(value);
    }

return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="무슨 생각 중이신가요?" maxLength={120} />
            <input type="submit" value ="Nweet" />
        </form>
    </div>
    )
}
export default Home;