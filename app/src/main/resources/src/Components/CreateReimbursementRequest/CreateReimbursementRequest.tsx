import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { CreateReimbursementRequest } from '../../Slices/PostSlice';

import pic from '../../deafultpic.jpg';
import { IReimbursement } from '../../Interfaces/IPost';

import './CreateReimbursementRequest.css';

export const CreateReimbursement: React.FC = () => {

    const [content, setContent] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const currentUser = useSelector((state:RootState)=> state.user.user);
    const dispatch:AppDispatch = useDispatch();

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "amount"){
            setAmount(event.target.value);
        }
        else if (event.target.name === "description"){
            setDescription(event.target.value);
        }
    }


    const handlePost = () => {

        let d = new Date();

        if(currentUser){
            let Reimbursement: any = {
                amount: amount,
                description: description,
                reimbursement_type: 1,
                reimbursement_status: 1
            }

            dispatch(CreateReimbursementRequest(Reimbursement));
        }
    }

    useEffect(() => {
        console.log(content);
    }, [content])

    return(
        <div className="create-container">

            <div>
                <form>
                    <div className="input-div">
                        <h4 className="input-h4">Please Enter amount</h4>
                        <input autoComplete="off" className="reimbursement-input" type="text" placeholder="amount" name="amount" onChange={handleChange}/>
                    </div>
                    <div className="input-div">
                        <h4 className="input-h4">Please Enter description</h4>
                        <input autoComplete="off" className="reimbursement-input" type="text" placeholder="description" name="description" onChange={handleChange}/>
                    </div>
                </form>
            </div>


            {/* <div className="content-container">
                <img className="create-profile-pic" src={pic} />
                <textarea className="content" onChange={handleChange} placeholder="Create new reimbursement request" maxLength={256}></textarea>
            </div> */}
            <button className="create-btn" onClick={handlePost}>Send New Request</button>
        </div>
    )

}