import './pp.scss'
import {Link} from 'react-router-dom'

export const Pp=()=>{
    return (
        <div className="pp">
                <h2>Privacy Policy for #hashError</h2>
                {/* <p>Effective Date: [Date]</p> */}

                <h3>1. Introduction</h3>
                <p>
                    Welcome to #hashError! This Privacy Policy is intended to help you understand how we collect, use,
                    disclose, and safeguard your personal information when you visit our website or use our services.
                </p>

                <h3>2. Information We Collect</h3>
                <ul>
                    <li>Personal Information: We may collect personal information that you voluntarily provide to us, such as your name,
                    email address, and any other information you submit through our contact forms or registration process.</li>
                    <li>Usage Information: We may collect information about how you use our website, including your IP address, browser type,
                    access times, and pages viewed.</li>
                    <li>Cookies and Similar Technologies: We may use cookies and similar tracking technologies to enhance your user experience,
                    customize content, and collect information about your interactions with our website.</li>
                </ul>

                <h3>3. How We Use Your Information</h3>
                <ul>
                    <li>Provide and Improve Services: We may use your information to provide and improve our services, respond to inquiries,
                    and personalize your user experience.</li>
                    <li>Communication: We may use your email address to send you updates, newsletters, and other project-related
                    communications. You can opt-out of these communications at any time.</li>
                    <li>Analytics: We may use aggregated and anonymized data for analytical purposes to understand trends, track user
                    interactions, and improve our website's performance.</li>
                </ul>

                <h3>4. How We Share Your Information</h3>
                <ul>
                    <li>Third-Party Service Providers: We may share your information with trusted third-party service providers who assist us
                    in operating our website and providing our services. These service providers are bound by confidentiality obligations and
                    are not permitted to use your information for any other purpose.</li>
                    <li>Legal Compliance: We may disclose your information when required by law, such as in response to a legal process or
                    government request.</li>
                </ul>

                <h3>5. Your Choices</h3>
                <ul>
                    <li>Opt-Out: You can opt-out of receiving promotional emails from us by following the instructions provided in the email.</li>
                    <li>Cookies: You can set your browser to refuse all or some browser cookies or to alert you when websites set or access
                    cookies. However, certain features of our website may not function properly without cookies.</li>
                </ul>

                <h3>6. Data Security</h3>
                <p>
                    We implement reasonable security measures to protect your personal information from unauthorized access and disclosure.
                    However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute
                    security.
                </p>

                <h3>7. Children's Privacy</h3>
                <p>
                    Our website is not intended for children under the age of [insert minimum age]. We do not knowingly collect personal
                    information from children under this age. If you believe we have inadvertently collected personal information from a child,
                    please contact us immediately.
                </p>

                <h3>8. Changes to This Privacy Policy</h3>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal,
                    or regulatory reasons. The updated policy will be posted on our website with the revised effective date.
                </p>

                <h3>9. Contact Us</h3>
                <p>
                    If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at{ ''}
                    [Your Contact Email].
                </p>
                <button ><Link className='link' to={'/'}>Back</Link></button>
        </div>
    )
}