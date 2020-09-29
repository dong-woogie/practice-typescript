import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GithubInput from "../components/GithubInput";
import GithubProfileInfo from "../components/GithubProfileInfo";
import { RootState } from "../modules";
import { getUserProfileThunk } from "../modules/github";

function GithubProfileLoader() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.github.userProfile
  );
  const dispatch = useDispatch();

  const onSubmitUsername = (username: string) => {
    dispatch(getUserProfileThunk(username));
  };
  return (
    <div>
      <GithubInput onSubmitUsername={onSubmitUsername} />
      {loading && <p style={{ textAlign: "center" }}>로딩중....</p>}
      {error && <p style={{ textAlign: "center" }}>에러발생!</p>}
      {data && (
        <GithubProfileInfo
          name={data.name}
          bio={data.bio}
          blog={data.blog}
          thumbnail={data.avatar_url}
        />
      )}
    </div>
  );
}

export default GithubProfileLoader;
