import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Privacy & Policy",
  description: `This Privacy & Policy page explains how we collect, use, store,
              and protect your personal information to ensure transparency,
              trust, and compliance with data protection regulations and
              practices.`,
});

const effectiveDate = "15/09/2025";
const entity = "Press & Public Freedom Organization";
const short = "PPFO";

const PrivacyAndPolicyPage = () => {
  return (
    <div className="article-width p-4 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row md: gap-6 pb-6">
        {/* Illustration */}
        <div className="flex justify-center items-center ">
          <Image
            width={500}
            height={500}
            src={"/resources/ppfo/logos/circular.png"}
            alt="PPFO logo"
            className="w-48"
          />
        </div>

        {/* Information */}
        <div className="flex justify-center items-center">
          {/* Wrapper */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-header">Privacy & Policy</h1>
            <p>
              This Privacy & Policy page explains how we collect, use, store,
              and protect your personal information to ensure transparency,
              trust, and compliance with data protection regulations and
              practices.
            </p>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="space-y-6">
        {/* Last Updated Section */}
        <section
          id="last-updated"
          className="p-4 bg-secondary text-sm font-light flex gap-2"
        >
          <span className="font-normal">Last Updated</span>
          <span className="italic">{effectiveDate}</span>
          <span>Applied</span>
        </section>

        {/* Section 1 */}
        <section id="introduction" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">1. Introduction</h1>
          <p>
            At <span className="font-semibold">{entity}</span>. We are committed
            to protecting your personal data and upholding your privacy rights.
            This Privacy Policy outlines how we collect, use, disclose, and
            safeguard your information when you access or use our web
            application and related services.
          </p>

          <p>
            Our platform allows users to engage in meaningful discourse by
            posting articles, creating threads, forming organizations,
            contributing to event archives (such as those related to war,
            genocide, or political conflict), and linking individuals—ranging
            from victims to public figures, heroes, and alleged perpetrators.
          </p>

          <p>
            This policy applies to all users of our platform, regardless of
            location, and reflects our compliance with applicable data
            protection laws, including:
          </p>

          <ul className="list-disc px-12">
            <li>
              Indonesia's Personal Data Protection{" "}
              <Link
                href={
                  "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022"
                }
              >
                PDP
              </Link>{" "}
              Law No. 27 of 2022
            </li>
            <li>
              The General Data Protection Regulation{" "}
              <Link href={"https://gdpr-info.eu/"}>GDPR</Link> of the European
              Union
            </li>
          </ul>

          <p>
            By using our services, you agree to the terms outlined in this
            Privacy Policy. If you do not agree with our practices, please do
            not use the platform.
          </p>

          <p>
            We encourage you to read this policy carefully to understand your
            rights and how your personal data is handled. If you have any
            questions, our contact details are provided at the end of this
            document.
          </p>

          <span className="text-sm font-light">
            Effective Date: {effectiveDate}
          </span>
        </section>

        {/* Section 2 */}
        <section id="who-we-are" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">2. Who We Are</h1>
          <p>
            <span className="font-semibold">{entity}</span> (“we”, “our”, or
            “us”) is a nonprofit platform based in Indonesia that promotes
            transparency, accountability, and public access to information.
            Through our web application, we provide tools for users to publish
            articles, create public discussions, document historical or ongoing
            events, and highlight the roles of individuals—whether victims,
            activists, officials, or others—within those narratives.
          </p>

          <p>
            Our commitment to press freedom, public participation, and
            historical documentation guides our mission. We are also committed
            to protecting the privacy of our users and ensuring compliance with
            applicable data protection laws, including the GDPR and Indonesia's
            PDP Law.
          </p>

          <p>
            If you have questions about this Privacy Policy or how we handle
            your data, you may contact us at:
          </p>

          <ul className="list-disc px-12">
            <li>support@mail.dimasfahmi.pro</li>
          </ul>

          <p>
            If required by law, or as our operations grow, we may appoint a Data
            Protection Officer (DPO). This information will be updated here
            accordingly.
          </p>
        </section>

        {/* Section 3 */}
        <section id="what-data-we-collect" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">3. What Data We Collect</h1>
          <p>
            We only collect and process the minimal personal data necessary to
            provide, secure, and operate our platform effectively. We do not
            collect or use personal information for advertising, tracking, or
            profiling purposes.
          </p>

          <h2 className="text-2xl font-header">
            3.1 Personal Information You Provide
          </h2>

          <p>
            When you create an account or log in, we collect the following
            information:
          </p>

          <ul className="list-disc px-12">
            <li>
              <span className="font-semibold">First and Last name</span> used
              for identification and display on your public profile
            </li>
            <li>
              <span className="font-semibold">Username</span> used for your
              unique identity within the platform
            </li>
            <li>
              <span className="font-semibold">Email Address</span> used strictly
              for account authentication and communication (not publicly
              visible)
            </li>
          </ul>

          <p>
            We do not share your email address publicly or expose it via any
            public-facing interfaces. It is stored securely in our database and
            protected by API-level restrictions and row-level security controls.
          </p>

          <h2 className="text-2xl font-header">
            3.2 Automatically Collected Data
          </h2>
          <p>
            For functionality and security, we use cookies and session data,
            including:
          </p>

          <ul className="list-disc px-12">
            <li>
              <span className="font-semibold">Session cookies</span> to keep you
              logged in securely
            </li>
            <li>
              <span className="font-semibold">CSRF protection tokens</span> to
              prevent cross-site request forgery attacks
            </li>
            <li>
              <span className="font-semibold">Registration phase cookies</span>{" "}
              to manage the multi-step registration process
            </li>
          </ul>

          <p>
            These cookies are essential for the operation of the website and
            cannot be disabled.
          </p>

          <h2 className="text-2xl font-header">
            3.3 Publicly Visible Information
          </h2>

          <p>
            When you register, some parts of your profile (such as your first
            name, last name, username, and avatar) may be visible to other users
            of the platform, depending on how you use the services (e.g., when
            posting articles or participating in threads).
          </p>

          <p>We do not collect:</p>

          <ul className="list-disc px-12">
            <li>
              <span className="font-semibold">Sensitive personal data </span>{" "}
              (e.g., race, religion, political beliefs, health, etc.)
            </li>
            <li>
              <span className="font-semibold">Behavioral data </span> for
              marketing or analytics
            </li>
            <li>
              <span className="font-semibold">Location data </span> (unless you
              voluntarily disclose it)
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="how-we-protect-your-data" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">4. How We Protect Your Data</h1>

          <p>
            We take the security of your personal information very seriously and
            implement appropriate technical and organizational measures to
            protect it from unauthorized access, disclosure, alteration, or
            destruction.
          </p>

          <p>
            Specifically, we use the following measures to safeguard your data:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>
              <span className="font-semibold">Row-Level Security (RLS):</span>{" "}
              Access to sensitive data, such as your email address, is strictly
              controlled at the database level using Row-Level Security. This
              ensures that only authorized processes and users can access
              specific records, preventing unauthorized exposure.
            </li>
            <li>
              <span className="font-semibold">API Security:</span> Personal data
              is accessible only through secured API endpoints that enforce
              strict authentication and authorization controls. No client-side
              access to sensitive data, such as email addresses, is allowed.
            </li>
            <li>
              <span className="font-semibold">Encryption:</span> Data
              transmitted between your device and our servers is protected using
              encryption protocols such as HTTPS (TLS), preventing interception
              by third parties.
            </li>
            <li>
              <span className="font-semibold">Secure Cookies:</span> Cookies
              used for session management and security (e.g., CSRF tokens,
              registration phase) are configured with security flags (such as
              HttpOnly and Secure) to mitigate risks like cross-site scripting
              (XSS) and session hijacking.
            </li>
            <li>
              <span className="font-semibold">Access Controls:</span> Our
              internal access to user data is limited to authorized personnel
              who require it to perform their duties. We regularly review and
              update permissions to maintain security.
            </li>
            <li>
              <span className="font-semibold">Regular Security Audit:</span> We
              perform ongoing assessments and updates of our security
              infrastructure to address emerging threats and vulnerabilities.
            </li>
          </ul>

          <p>
            While we strive to protect your data with strong security measures,
            no method of transmission or storage is 100% secure. If you suspect
            any breach or have concerns about your data security, please contact
            us immediately.
          </p>
        </section>

        {/* Section 5 */}
        <section id="your-data-protection-rights" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">
            5. Your Data Protection Rights
          </h1>
          <p>
            {` We respect your rights regarding your personal data and are
            committed to helping you exercise them under applicable data
            protection laws, including the General Data Protection Regulation
            (GDPR) and Indonesia's Personal Data Protection (PDP) Law.`}
          </p>

          <p>
            Depending on your jurisdiction, you may have the following rights:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>
              <span className="font-semibold">Right to Access:</span> You have
              the right to request access to the personal data we hold about you
              and receive a copy of that information.
            </li>
            <li>
              <span className="font-semibold">Right to Rectification:</span> If
              any of your personal data is inaccurate or incomplete, you can
              request that we correct or update it.
            </li>
            <li>
              <span className="font-semibold">
                Right to Erasure (“Right to be Forgotten”):
              </span>{" "}
              You may request that we delete your personal data, subject to
              certain legal exceptions (e.g., data required to comply with legal
              obligations).
            </li>
            <li>
              <span className="font-semibold">
                Right to Restrict Processing:
              </span>{" "}
              You have the right to request that we limit how we use your
              personal data in certain circumstances.
            </li>
            <li>
              <span className="font-semibold">Right to Data Portability:</span>{" "}
              Where applicable, you may request that we provide your personal
              data to you or another service provider in a commonly used,
              machine-readable format.
            </li>
            <li>
              <span className="font-semibold">Right to Object:</span> You can
              object to the processing of your personal data in certain cases,
              such as direct marketing or legitimate interest processing.
            </li>
            <li>
              <span className="font-semibold">Right to Withdraw Consent:</span>{" "}
              If we rely on your consent to process your data, you may withdraw
              that consent at any time. Withdrawal of consent does not affect
              the lawfulness of processing before the withdrawal.
            </li>
            <li>
              <span className="font-semibold">Right to Lodge a Complaint:</span>{" "}
              If you believe your data protection rights have been violated, you
              have the right to lodge a complaint with a relevant supervisory
              authority (e.g., the data protection authority in your country or
              the EU Data Protection Board).
            </li>
          </ul>

          <h3 className="font-header text-2xl">How to Exercise Your Rights</h3>
          <p>
            To exercise any of these rights, please contact us using the details
            provided in the Contact Us section. We will respond to your request
            within a reasonable timeframe and in accordance with applicable law.
          </p>
        </section>

        {/* Section 6 */}
        <section id="data-retention" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">6. Data Retention</h1>

          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes for which it was collected, including to
            operate the platform, maintain your account, comply with legal
            obligations, and enforce our terms.
          </p>

          <h3 className="text-2xl font-header">Account and Content Deletion</h3>
          <p>
            When you choose to delete your account or remove content (such as
            articles), we implement a soft delete process:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>
              The data is immediately deactivated and no longer visible or
              accessible to other users.
            </li>
            <li>
              It remains stored securely for 30 days, during which time you may
              request to recover the data if deletion was accidental.
            </li>
            <li>
              After 30 days, the data is permanently deleted from our systems,
              unless we are legally required to retain it.
            </li>
          </ul>

          <h3 className="text-2xl font-header">Exceptions</h3>
          <p>
            When you choose to delete your account or remove content (such as
            articles), we implement a soft delete process:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>
              Comments and Threads that you participated in may remain on the
              platform even after your account is deleted, as they are part of
              shared public discussions. However, any identifying information
              (such as your name or avatar) will be removed or anonymized.
            </li>
            <li>
              We may retain limited non-personal or anonymized data for
              research, archival, or statistical purposes where legally
              permissible.
            </li>
          </ul>

          <h3 className="text-2xl font-header">Temporary Data</h3>
          <p>
            When you choose to delete your account or remove content (such as
            articles), we implement a soft delete process:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>
              Session and registration cookies expire automatically once the
              session ends or the registration process is completed.
            </li>
          </ul>

          <p>
            We regularly review our data retention practices to ensure we only
            store data for as long as necessary.
          </p>
        </section>

        {/* Section 7 */}
        <section id="third-party-access-or-sharing" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">
            7. Third-Party Access or Sharing
          </h1>

          <p>
            <span className="font-semibold">
              We do not sell, rent, or share your personal data{" "}
            </span>{" "}
            with third parties for advertising, marketing, or profiling
            purposes. However, to provide and maintain our services, we may
            share limited personal data with a small number of trusted
            third-party service providers. These providers are contractually
            obligated to protect your data and use it only for the specific
            purpose we authorize.
          </p>

          <h3 className="text-2xl font-header">Our Service Providers</h3>

          <p>
            We use Supabase to host our backend infrastructure, including
            authentication, database, and API services. Your personal data (such
            as account information and email) is securely stored and processed
            on Supabase's platform. Supabase adheres to modern data protection
            and security standards.
          </p>

          <p>
            We use Resend to send transactional emails (e.g., login links,
            account confirmations). When an email is sent, your email address is
            shared with Resend solely for the purpose of delivering that
            message. Resend does not store or use your email for any other
            purpose.
          </p>

          <h3 className="text-2xl font-header">Data Location and Transfers</h3>

          <p>
            Our third-party providers may process data on servers located
            outside Indonesia or the European Union. In such cases, we ensure
            that appropriate safeguards are in place, such as standard
            contractual clauses or equivalent mechanisms, to protect your
            personal data in accordance with GDPR and Indonesian PDP Law.
          </p>

          <p>
            Your data may be stored or processed on servers located in the
            following countries:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>United States</li>
            <li>European Union Member States</li>
            <li>Singapore</li>
            <li>Indonesia</li>
          </ul>

          <p>
            When personal data is transferred to or processed in countries
            outside Indonesia or the European Economic Area (EEA), we ensure
            appropriate safeguards are in place, such as Standard Contractual
            Clauses (SCCs) or other legally recognized mechanisms, in accordance
            with GDPR and Indonesia's PDP Law.
          </p>

          <h3 className="text-2xl font-header">Legal Disclosure</h3>

          <p>
            We may disclose your personal data if required to do so by law,
            regulation, court order, or governmental request. We will always
            strive to notify you when such disclosures are legally permitted.
          </p>
        </section>

        {/* Section 8 */}
        <section id="childrens-privacy" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">{`8. Children's Privacy`}</h1>
          <p>
            Our services are not directed to or intended for use by individuals
            under the age of 18. We do not knowingly collect personal data from
            anyone under this age. If you are under 18, please do not register,
            use the platform, or submit any personal information.
          </p>

          <p>
            Given the sensitive and potentially graphic nature of some content
            on our platform, such as discussions of war, human rights
            violations, or historical conflicts, we restrict access to adults
            only.
          </p>

          <p>
            If we discover that we have collected personal data from someone
            under the age of 18 without verified parental or legal guardian
            consent, we will delete that information as soon as possible.
          </p>

          <p>
            Parents or guardians who believe their child has provided us with
            personal data may contact us to request deletion.
          </p>
        </section>

        {/* Section 9 */}
        <section
          id="changes-to-this-privacy-policy"
          className="mt-12 space-y-4"
        >
          <h1 className="text-4xl font-header">{`9. Changes to This Privacy Policy`}</h1>

          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, legal obligations, or the functionality of
            our platform. When we make changes, we will revise the "Effective
            Date" at the top of this page.
          </p>

          <p>
            If the changes are significant, we will notify you through
            appropriate means, such as an email notification or a notice on the
            platform.
          </p>

          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we protect your personal data.
          </p>
        </section>

        {/* Section 10 */}
        <section id="contact-us" className="mt-12 space-y-4">
          <h1 className="text-4xl font-header">{`10. Contact Us`}</h1>

          <p>
            If you have any questions, concerns, or requests related to this
            Privacy Policy or your personal data, you can contact us at:
          </p>

          <ul className="list-disc px-12 space-y-2">
            <li>Email: support@mail.dimasfahmi.pro</li>
          </ul>

          <p>
            We are committed to responding to your inquiries in a timely and
            transparent manner, and to resolving any concerns in line with
            applicable data protection laws.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyAndPolicyPage;
