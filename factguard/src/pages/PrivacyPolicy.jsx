import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background text-white px-6 py-20 md:px-16 lg:px-28">
      <article className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: June 23, 2025</p>
        </header>

        <section className="space-y-10 text-gray-300 text-base leading-relaxed">
          <p>
            This Privacy Policy describes how{" "}
            <strong className="text-white">FactGuard</strong> collects, uses,
            and protects your information when you access our platform. By using
            our services, you agree to this policy.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Account info:</strong> Name, username, email address,
                and password.
              </li>
              <li>
                <strong>Usage data:</strong> Content you analyze, timestamps,
                and interactions.
              </li>
              <li>
                <strong>Technical data:</strong> Browser type, IP address, and
                device information.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide, maintain, and improve the FactGuard platform.</li>
              <li>Personalize your experience and provide tailored results.</li>
              <li>
                Communicate important updates or respond to your support
                requests.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Data Sharing
            </h2>
            <p>
              We do <strong className="text-white">not</strong> sell your data.
              We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Trusted third-party services that help operate our platform
                (e.g., hosting, analytics).
              </li>
              <li>Law enforcement or legal bodies if required by law.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Cookies & Tracking
            </h2>
            <p>
              We may use cookies and similar technologies to understand user
              behavior and improve performance. You can control cookie
              preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Data Security
            </h2>
            <p>
              We take security seriously. FactGuard uses encryption, secure
              access controls, and regular audits to protect your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access or update your personal information.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>
                Withdraw consent where processing is based on your approval.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Third-Party Links
            </h2>
            <p>
              Our platform may contain links to other websites. We are not
              responsible for the privacy practices of those third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with a new effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a
                href="mailto:support@factguard.ai"
                className="underline text-[#9B59B6] hover:text-[#BB86FC]"
              >
                support@factguard.ai
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
