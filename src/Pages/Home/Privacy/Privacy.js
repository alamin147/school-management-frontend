import React from 'react';

const Privacy = () => {
    return (
        <>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                Disclosure of Your Information
                </div>
                <div className="collapse-content">
                    <p>We do not share your personal information with third parties unless required by law or as necessary to provide the Service.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                Information We Collect
                </div>
                <div className="collapse-content">
                    <p>We may collect personal information such as your name and email address when you interact with our website, sign up for newsletters, or contact us.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                Your Choices
                </div>
                <div className="collapse-content">
                    <p>You can opt-out of receiving promotional emails from us by following the instructions in those emails. You may also contact us to update or delete your personal information.</p>
                </div>
            </div>
        </>
    );
};

export default Privacy;