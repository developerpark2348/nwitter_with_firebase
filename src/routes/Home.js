import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(()=>{
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { target: {value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files}} = event;
        // event안의 target으로 들어가 안의 files를 가져오는것을 뜻함.
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}, } = finishedEvent;
            // finishedEvent의 currentTarger의 reuslt를 불러옴.
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment(null);

return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="무슨 생각 중이신가요?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value ="Nweet" />
            { attachment && 
            <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>업로드 취소하기</button>
            </div>
            }
        </form>
        <div>
            {nweets.map((nweet) => 
                <Nweet 
                key={nweet.id} 
                nweetObj={nweet} 
                isOwner={nweet.creatorId === userObj.uid}
                />
            )}
        </div>
    </div>
    )
}
export default Home;