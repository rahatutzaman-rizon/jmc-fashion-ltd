import React from 'react';
import img from "../../assets/img1.jpeg"
import Link from "next/link";
import Image from 'next/image';
const Page = () => {
    return (
        <>
           =
            <div className="container">
                <div className="row h-100  justify-content-center align-items-center">
                    <div className="col-md-2 centered text-center col-sm-12 col-lg-2">
                        <Image  className="w-50" src={img} alt="success"

                        /> 
                        <h6 className="my-2">Payment Successful </h6>
                        <Link className="btn mt-2 btn-success" href="/">Order List</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Page;