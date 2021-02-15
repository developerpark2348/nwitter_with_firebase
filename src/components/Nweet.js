import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 이 nweet을 삭제하시겠습니까?");
        console.log(ok)
        if (ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        })
        setEditing(false);
    }

    const onChange = (event) => {
        const {target: { value }, } = event;
        setNewNweet(value);
    }

    return(
        <div>
            { 
            editing ?
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                            <input 
                            type="text" 
                            placeholder="nweet을 편집하세요" 
                            value={newNweet} 
                            required
                            onChange={onChange}
                            />
                            <input
                            type="submit"
                            value="업데이트 nweet"
                            />
                            </form>
                            <button onClick={toggleEditing}>취소하기</button>
                        </>
                    )}
                </>
            :
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <> 
                        <button onClick={onDeleteClick}>Nweet 삭제하기</button>
                        <button onClick={toggleEditing}>Nweet 편집하기</button> 
                    </>
                )}
            </>
            }
        </div>
    )
};

export default Nweet;