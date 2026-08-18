"use client";

import { useState } from "react";
import {
  CONSENT_LABEL,
  CONSENT_TEXT,
  CONSENT_WRAP,
  DONE,
  DONE_BODY,
  DONE_HEADING,
  DONE_RESET,
  EYEBROW,
  FIELD,
  FIELDSET,
  FORM,
  FULL,
  GRID,
  INPUT,
  LABEL,
  LEGEND,
  OWNERSHIP_CHIP,
  OWNERSHIP_ROW,
  RESPONSE_NOTE,
  SECTION_NUM,
  SECTION_TITLE,
  SUBMIT,
  TEXTAREA,
} from "./registrationClasses";

type Ownership = "limited" | "sole";

export default function RegistrationForm({ contactEmail = "info.uk@lemon-soda.eu" }: { contactEmail?: string }) {
  const [ownership, setOwnership] = useState<Ownership>("limited");
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");

  const limited = ownership === "limited";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ref = `LS-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setReference(ref);
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = (e: React.MouseEvent) => {
    e.preventDefault();
    setDone(false);
    setReference("");
  };

  return (
    <>
      {done && (
        <div className={DONE}>
          <span className={EYEBROW}>Submitted</span>
          <h2 className={DONE_HEADING}>Application received</h2>
          <p className={DONE_BODY}>
            Your reference is <strong style={{ fontWeight: 500 }}>{reference}</strong>. Our accounts team reviews
            new applications within two working days and will contact you at the accounts email provided. Questions
            in the meantime:{" "}
            <a href={`mailto:${contactEmail}`} style={{ borderBottom: "1px solid rgba(18,18,17,0.3)" }}>
              {contactEmail}
            </a>
            .
          </p>
          <button type="button" onClick={reset} className={DONE_RESET}>
            Submit another application
          </button>
        </div>
      )}

      {!done && (
        <form onSubmit={submit} className={FORM}>
          <fieldset className={FIELDSET}>
            <legend className={LEGEND}>
              <span className={SECTION_NUM}>Section 1</span>
              <span className={SECTION_TITLE}>Applicant details</span>
            </legend>
            <div className={GRID}>
              <label className={`${FIELD} ${FULL}`}>
                <span className={LABEL}>Registered / legal business name *</span>
                <input type="text" name="legal_name" required className={INPUT} />
              </label>
              <label className={`${FIELD} ${FULL}`}>
                <span className={LABEL}>Trading name (if different)</span>
                <input type="text" name="trading_name" className={INPUT} />
              </label>
              <label className={`${FIELD} ${FULL}`}>
                <span className={LABEL}>Main business address (including postcode) *</span>
                <textarea name="business_address" rows={3} required className={TEXTAREA} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Telephone *</span>
                <input type="tel" name="telephone" required className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Mobile telephone</span>
                <input type="tel" name="mobile" className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Accounts contact name *</span>
                <input type="text" name="accounts_contact" required className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Accounts email *</span>
                <input type="email" name="accounts_email" required className={INPUT} />
              </label>
              <label className={`${FIELD} ${FULL}`}>
                <span className={LABEL}>Website</span>
                <input type="text" name="website" placeholder="www." className={INPUT} />
              </label>
            </div>
          </fieldset>

          <fieldset className={FIELDSET}>
            <legend className={LEGEND}>
              <span className={SECTION_NUM}>Section 2</span>
              <span className={SECTION_TITLE}>Business ownership</span>
            </legend>
            <div className={OWNERSHIP_ROW}>
              <label
                className={OWNERSHIP_CHIP}
                style={{
                  background: limited ? "#FFFFFF" : "transparent",
                  color: limited ? "#121211" : "rgba(18,18,17,0.76)",
                }}
              >
                <input
                  type="radio"
                  name="ownership"
                  value="limited"
                  checked={limited}
                  onChange={() => setOwnership("limited")}
                />
                Limited company
              </label>
              <label
                className={OWNERSHIP_CHIP}
                style={{
                  background: !limited ? "#FFFFFF" : "transparent",
                  color: !limited ? "#121211" : "rgba(18,18,17,0.76)",
                }}
              >
                <input
                  type="radio"
                  name="ownership"
                  value="sole"
                  checked={!limited}
                  onChange={() => setOwnership("sole")}
                />
                Sole trader / partnership
              </label>
            </div>

            {limited ? (
              <div className={GRID} style={{ paddingTop: 8 }}>
                <label className={FIELD}>
                  <span className={LABEL}>Director 1 — full name *</span>
                  <input type="text" name="director_1" className={INPUT} />
                </label>
                <label className={FIELD}>
                  <span className={LABEL}>Director 2 — full name (if applicable)</span>
                  <input type="text" name="director_2" className={INPUT} />
                </label>
                <label className={`${FIELD} ${FULL}`}>
                  <span className={LABEL}>Registered office address &amp; postcode</span>
                  <textarea name="registered_office" rows={3} className={TEXTAREA} />
                </label>
                <label className={FIELD}>
                  <span className={LABEL}>Companies House registration no.</span>
                  <input type="text" name="companies_house" className={INPUT} />
                </label>
              </div>
            ) : (
              <div className={GRID} style={{ paddingTop: 8 }}>
                <label className={FIELD}>
                  <span className={LABEL}>Sole trader / Partner 1 — full name *</span>
                  <input type="text" name="partner_1" className={INPUT} />
                </label>
                <label className={FIELD}>
                  <span className={LABEL}>Partner 2 — full name (if applicable)</span>
                  <input type="text" name="partner_2" className={INPUT} />
                </label>
                <label className={`${FIELD} ${FULL}`}>
                  <span className={LABEL}>Sole trader / Partner 1 — address &amp; postcode</span>
                  <textarea name="partner_1_address" rows={3} className={TEXTAREA} />
                </label>
                <label className={`${FIELD} ${FULL}`}>
                  <span className={LABEL}>Partner 2 — address &amp; postcode (if applicable)</span>
                  <textarea name="partner_2_address" rows={3} className={TEXTAREA} />
                </label>
              </div>
            )}
          </fieldset>

          <fieldset className={FIELDSET}>
            <legend className={LEGEND}>
              <span className={SECTION_NUM}>Section 3</span>
              <span className={SECTION_TITLE}>Business activity</span>
            </legend>
            <div className={GRID}>
              <label className={FIELD}>
                <span className={LABEL}>Annual estimated turnover (GBP) *</span>
                <input type="text" name="turnover" required placeholder="£" className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Number of employees</span>
                <input type="number" name="employees" min={0} className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Number of branches / offices</span>
                <input type="number" name="branches" min={0} className={INPUT} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Number of years trading</span>
                <input type="number" name="years_trading" min={0} className={INPUT} />
              </label>
              <label className={`${FIELD} ${FULL}`}>
                <span className={LABEL}>VAT registration no. (if applicable)</span>
                <input type="text" name="vat_no" className={INPUT} />
              </label>
            </div>
          </fieldset>

          <div className={CONSENT_WRAP}>
            <label className={CONSENT_LABEL}>
              <input type="checkbox" name="confirm" required />
              <span className={CONSENT_TEXT}>
                By submitting this form I agree and consent to the{" "}
                <a href="https://drive.google.com/file/d/1wbNswGZUtZhpX_3itOkXd0e4jzW8eNjP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
              </span>
            </label>
            <p className={RESPONSE_NOTE}>
              We&apos;ll contact you within one working day to discuss setting up your account.
            </p>
            <button type="submit" className={SUBMIT}>
              Apply for account
            </button>
          </div>
        </form>
      )}
    </>
  );
}
