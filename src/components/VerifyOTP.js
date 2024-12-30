import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const matchOTP = () => {
    let first = document.getElementById("first").value;
    let second = document.getElementById("second").value;
    let third = document.getElementById("third").value;
    let fourth = document.getElementById("fourth").value;
    let fifth = document.getElementById("fifth").value;
    let sixth = document.getElementById("sixth").value;

    if (
      first === 1 &&
      second === 2 &&
      third === 3 &&
      fourth === 3 &&
      fifth === 2 &&
      sixth === 1
    ) {
      navigate("/newPassword");
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div className="font-inter">
      <div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-md text-center">
          <div class="space-y-4">
            <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Verify Your OTP
            </h1>
            <p class="text-muted-foreground">
              We've sent a 6-digit one-time password to your registered mobile
              number. Please enter the code below to verify your identity.
            </p>
            <p className="text-ellipsis">Default OTP: 123321</p>
            <form class="space-y-4 flex flex-col justify-center items-center">
              <div class="flex items-center justify-center gap-2">
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="first"
                />
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="second"
                />
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="third"
                />
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="fourth"
                />
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="fifth"
                />
                <input
                  class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  id="sixth"
                />
              </div>
              <div>
                <p>Didn't get the OTP?</p>
                <button class="inline-flex items-center underline justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground">
                  Resend
                </button>
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-black text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-96 max-w-[200px]"
                  type="submit"
                  onClick={matchOTP}
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
