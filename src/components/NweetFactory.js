import React, {useState} from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService.
            ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
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
    };

    const onClearAttachment = () => setAttachment(null);

    return (
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
    )
}

export default NweetFactory;