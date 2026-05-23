import styles from "./HelpCom.module.css";

function HelpCom() {
  return (
    <main>
      <section>
        <h2 className="text-size1 text-style1">What is Stone WhiteRock?</h2>
        <p>
          Stone WhiteRock is an experimental web application designed to display and visualize market-related signals in a structured and
          interpretable way. The platform is intended strictly for educational, research, and demonstrational purposes.
        </p>
        <p>It should not be interpreted as a professional financial advisory tool or an investment recommendation system.</p>
      </section>

      <section>
        <h2>Is this financial advice?</h2>
        <p className={styles.important}>No. Absolutely not.</p>
        <p>
          Any resemblance between the content presented in this system and actual financial advice is purely coincidental. Interpretation is
          done entirely at your own discretion and risk.
        </p>
      </section>

      <section>
        <h2>Can I make money using this?</h2>
        <p>In theory, yes. In practice, the system provides signals, not guarantees, and certainly not predictions.</p>
        <p>Past performance should never be considered an indicator of future results. All outcomes are your responsibility.</p>
      </section>

      <section>
        <h2>Who is responsible for losses or damages?</h2>
        <p>
          No party involved in the creation, deployment, or hosting of this system accepts any responsibility for any form of loss or
          damage. Following includes:
        </p>
        <ul>
          <li>Authors</li>
          <li>Hosting providers</li>
          <li>Your browser</li>
          <li>Your internet connection</li>
          <li>Market volatility</li>
          <li>Cosmic events of questionable relevance</li>
        </ul>
      </section>

      <section>
        <h2>Are the signals reliable?</h2>
        <p>Signals are generated using experimental logic and may vary in accuracy, usefulness, and interpretability.</p>
        <p>No guarantees are provided regarding correctness, stability, or profitability.</p>
      </section>

      <section>
        <h2>Can I contact the authors?</h2>
        <p>Yes. Responses may include:</p>
        <ul>
          <li>“It is working as intended.”</li>
          <li>“This is a feature, not a bug.”</li>
        </ul>
      </section>

      <section>
        <h2>Do I need to share profits with the authors?</h2>
        <p>No formal requirement exists. However, symbolic appreciation is always conceptually welcome in hypothetical scenarios.</p>
        <p>Any arrangement of profit sharing is purely fictional, unenforceable, and not legally recognized anywhere.</p>
      </section>

      <section>
        <h2>Why was this project created?</h2>
        <p>
          Stone WhiteRock was created as part of a university project exploring data analysis, signal processing, and system design in
          financial contexts.
        </p>
        <p>It is intended for academic exploration rather than real-world financial deployment.</p>
      </section>

      <section>
        <h2>Should I take this seriously?</h2>
        <p>Take it seriously as a technical experiment, not as financial guidance.</p>
        <p>A balanced level of curiosity and skepticism is recommended.</p>
      </section>

      <section>
        <h2>Final Notice</h2>
        <p>This system is provided on an experimental, educational, and semi-satirical basis.</p>
        <p>It does not constitute financial advice or investment guidance of any kind.</p>
        <p>By using this system, you acknowledge that markets are unpredictable and no algorithm guarantees success.</p>
      </section>
    </main>
  );
}

export default HelpCom;
