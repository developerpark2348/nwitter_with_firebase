import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 이 nweet을 삭제하시겠습니까?");
        console.log(ok)
        if (ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        })
        setEditing(false);
    };

    const onChange = (event) => {
        const {target: { value }, } = event;
        setNewNweet(value);
    };

    return(
        <div className="nweet">
            { 
            editing ?
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
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
                            className="formBtn"
                            />
                            </form>
                            <span onClick={toggleEditing}
                            className="formBtn cancelBtn">
                                취소하기
                            </span>
                        </>
                    )}
                </>
            :
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                {isOwner && (
                    <div class="nweet_actions"> 
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </span>
                    </div>
                )}
            </>
            }
        </div>
    )
};

export default Nweet;