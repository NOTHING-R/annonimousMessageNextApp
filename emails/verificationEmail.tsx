import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

export function VarificationEmail({
  username,
  otp,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Hello {username}</h1>
      <p>
        This is your varification email. You have to use it for verify your
        account
      </p>
      <h4>VERIFICATION CODE</h4>
      <h2>{otp}</h2>
    </div>
  );
}
