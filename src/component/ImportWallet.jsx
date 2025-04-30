import { useState } from "react";
import { recoverMultipleWallets } from "../services/import";

const ImportWallet = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountIndex, setAccountIndex] = useState(0);
  const [errorDisplay, setErrorDisplay] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(mnemonic);
    const results = await recoverMultipleWallets(mnemonic, 1);
    setResult(results);
  }
  function handleChange(e) {
    setMnemonic(e.target.value);
  }
  return (
    <>
      <div className="text-black items-center  pt-96 flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            name="mne"
            type="text"
            value={mnemonic}
            onChange={handleChange}
            placeholder="Enter mnemonic"
            className="bg-white border-2  border-white focus:border-yellow-200 focus:outline-none "
          ></input>
          <button type="submit" className="bg-amber-500 pl-10">
            submit
          </button>
        </form>
      </div>
      <div className="result">
		
	  </div>
    </>
  );
};

export default ImportWallet;
