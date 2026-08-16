"use client";

export default function ProfileWin() {
  return (
    <div className="p">
      <div className="pname">
        lorenzo<em>@portfolio</em>
      </div>
      <div className="prow">
        <span className="pk">Name:</span>
        <span className="pv">Lorenzo Recchia</span>
      </div>
      <div className="prow">
        <span className="pk">GitHub:</span>
        <span className="pv">
          <a className="plink" href="https://github.com/St0rmosu" target="_blank" rel="noreferrer">
            St0rmosu
          </a>
        </span>
      </div>
      <div className="prow">
        <span className="pk">City:</span>
        <span className="pv">Putignano, Italy</span>
      </div>
      <div className="colorstrip">
        <div className="cs" style={{ background: "#1a1510" }} />
        <div className="cs" style={{ background: "#2a3820" }} />
        <div className="cs" style={{ background: "#4a6038" }} />
        <div className="cs" style={{ background: "#8a9e70" }} />
        <div className="cs" style={{ background: "#b0b898" }} />
        <div className="cs" style={{ background: "#c8c4a8" }} />
        <div className="cs" style={{ background: "#d4c9b0" }} />
        <div className="cs" style={{ background: "#c4a96a" }} />
      </div>
    </div>
  );
}
