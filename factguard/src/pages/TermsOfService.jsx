import React from "react";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background text-white px-6 py-20 md:px-16 lg:px-28">
      <article className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">Last updated: June 23, 2025</p>
        </header>

        <section className="space-y-10 text-gray-300 text-base leading-relaxed">
          <p>
            Welcome to <strong className="text-white">FactGuard</strong>. These
            Terms of Service (“Terms”) govern your use of our website, services,
            and AI tools. By using FactGuard, you agree to be legally bound by
            these Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our services, you confirm that you have
              read, understood, and agreed to these Terms. If you do not agree,
              please refrain from using FactGuard.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Use of Service
            </h2>
            <p>
              FactGuard provides AI-powered tools to analyze and detect
              misleading content. You agree not to misuse the platform or use it
              for unlawful, harmful, or unauthorized purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate registration information.</li>
              <li>Keep your login credentials secure and confidential.</li>
              <li>
                Do not submit harmful, offensive, or intentionally false
                content.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All content, tools, designs, and intellectual property on
              FactGuard remain the exclusive property of the creators. You may
              not copy, distribute, or exploit any part without written
              permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We aim for high accuracy, but cannot guarantee that all
              AI-generated analysis will be correct. You assume full
              responsibility for how you use the results.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access if you
              violate these Terms or use the service inappropriately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Changes to Terms
            </h2>
            <p>
              We may update these Terms at any time. Changes will be reflected
              on this page, and your continued use of the service implies your
              acceptance of the latest version.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Contact
            </h2>
            <p>
              If you have questions or concerns about these Terms, please
              contact us at{" "}
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

export default TermsOfService;
