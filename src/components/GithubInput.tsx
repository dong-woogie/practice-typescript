import React, { ChangeEvent, FormEvent, useState } from "react";
import "./GithubInput.css";
type GithubInputProps = {
  onSubmitUsername: (username: string) => void;
};

function GithubInput({ onSubmitUsername }: GithubInputProps) {
  const [input, setInput] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className="GithubUsernameForm">
      <input
        type="text"
        onChange={onChange}
        value={input}
        placeholder="Github 계정명을 입력해주세요..."
      />
      <button type="submit">조회</button>
    </form>
  );
}

export default GithubInput;
