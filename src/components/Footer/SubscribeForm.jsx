import React from "react";
import { useDispatch } from 'react-redux';
import { subscribe } from "redux/subscribe/subscribeOperations";
import { Button } from "components/Button/Button";
import { ReactComponent as SvgMail } from './images/mailIcon.svg';
import { emailRegExp } from "utils/regExp/regExp";

export const SubscribeForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');

    const isEmailValid = email.match(emailRegExp);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid) {
            dispatch(subscribe(email));
            setEmail('');
        }
    }
    return (
        <div className="ml-0 justify-center justify-self-center">
            <div className="hidden md:hidden xl:block xl:mb-[28px]"
                style={{ width: 339 }}>
                <h3 style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: 'white',
                }}>Subscribe to our Newsletter</h3>
                <p style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.29,
                    color: 'white',
                    marginTop: 14,
                }}>Subscribe up to our newsletter. Be in touch with latest news and special offers, etc.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row xl:flex-col ">
                {/* w-[204px] md:w-[442px] xl:w-[338px]  */}
                <div className="relative md:mr-[12px] xl:mr-0">
                    <div className="absolute top-[13px] md:top-[17px] xl:top-[21.5px] left-[14px] md:left-[15px] xl:left-[15.5px]">
                        <SvgMail className="w-[16px] h-[12px] md:w-[20px] md:h-[16px]" />
                    </div>
                    <input type="email" name="email" id="" placeholder="Enter your email address" value={email} 
                        onChange={handleInputChange}
                        placeholdertextcolor='#ffffff'
                        style={{
                            backgroundColor: 'inherit', borderRadius: 6, color: '#ffffff',
                        }}
                        className="md:w-[260px] xl:w-full mb-[16px] md:mb-0 xl:mb-[16px] py-[11.5px] md:py-[14.5px] xl:py-[17.5px] pl-[42px] xl:pl-[51px] pr-[14px] text-[10px]/[15px] md:text-[14px]/[21px] w-full"
                    />
                </div>
                <Button cssClass="subscribe-btn" text="Subcribe" type='submit' className='bg-accentMain dark:bg-accentDark'></Button>
            </form>
        </div>
    )
}