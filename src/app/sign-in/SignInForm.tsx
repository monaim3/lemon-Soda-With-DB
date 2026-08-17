"use client";

import { useState } from "react";
import {
  ERROR,
  FIELD,
  FIELDS,
  FORGOT,
  FORM,
  FORM_HEADING,
  FORM_SUB,
  HELPER,
  INPUT,
  KEEP,
  LABEL,
  LABEL_ROW,
  SUBMIT,
} from "./signInClasses";

/**
 * Client-side only. There is no auth call — submit runs the empty-field check
 * and nothing else. Wire it to the login endpoint and render server-side
 * errors into the same banner.
 */
export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const complete = username.trim() !== "" && password.trim() !== "";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!complete) {
      setError(true);
      return;
    }
    setError(false);
    // TODO: POST to the login endpoint.
  };

  return (
    <form className={FORM} onSubmit={submit} noValidate>
      <h2 className={FORM_HEADING}>I&apos;m already a customer</h2>
      <p className={FORM_SUB}>Sign in with your dealer account to see trade pricing and place orders.</p>

      {error && (
        <p className={ERROR} role="alert">
          Enter both your username and password to continue.
        </p>
      )}

      <div className={FIELDS}>
        <label className={FIELD}>
          <span className={LABEL_ROW}>
            <span className={LABEL}>Username</span>
          </span>
          <input
            type="text"
            name="username"
            autoComplete="username"
            className={INPUT}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
            }}
          />
        </label>

        <label className={FIELD}>
          <span className={LABEL_ROW}>
            <span className={LABEL}>Password</span>
            <a href="#" className={FORGOT}>
              Forgot your password?
            </a>
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className={INPUT}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
        </label>
      </div>

      <p className={HELPER}>
        First time logging in to the new webshop? You&apos;ll need to reset your password using the link above.
      </p>

      <button type="submit" className={SUBMIT} disabled={!complete}>
        Login
      </button>

      <label className={KEEP}>
        <input type="checkbox" name="keep_signed_in" />
        Keep me signed in on this device
      </label>
    </form>
  );
}
