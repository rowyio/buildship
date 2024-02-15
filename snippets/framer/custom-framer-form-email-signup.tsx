import React, { useState } from "react"
import Example from "https://framer.com/m/framer/Example.js@^1.0.0"

// BuildShip.com Open Source Form component for Framer
export default function NewsletterSubscriptionForm(props) {
    // Paste your API link from BuildShip.com
    // Read tutorial here:
    // Watch tutorial video:

    // TODO: Update this with your BuildShip API or any external API handler
    const formUrl = "https://<projectid>.buildship.run/<path>"

    // MAYBE: If you are adding more fields to your form in addition to email update here
    const [email, setEmail] = useState("")
    const [formStatus, setFormStatus] = useState("unsubmitted")

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(formUrl, {
                method: "POST",
                body: JSON.stringify({ email }), // Construct your form data: comma seperated list
                headers: {
                    "Content-type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            setFormStatus("submitted") // Update state to indicate successful submission
        } catch (error) {
            console.error("Error during form submission: ", error)
            setFormStatus("error") // Update state to indicate an error
        }
    }

    // Function to update email state
    // MAYBE: If you are adding more fields to your form in addition to email update here
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    if (formStatus === "submitted") {
        return <div style={responseText}>Thank you for subscribing!</div>
    }

    if (formStatus === "error") {
        return <div>Something went wrong. Please refresh and try again!</div>
    }
    return (
        <>
            {/* Label for the form */}
            <div style={labelStyle}>
                Subscribe to our product updates newsletter
            </div>
            {/* Form */}
            <form onSubmit={onSubmit} style={containerStyle}>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Your email"
                    required
                    style={inputStyle}
                />
                <input type="submit" value="Signup" style={submitButtonStyle} />
            </form>
        </>
    )
}
/// Updated Form Styles to match the provided image

// Assuming a dark theme similar to the one in the image
const containerStyle = {
    display: "flex", // Changed from flexDirection to display for correct CSS
    justifyContent: "space-between", // Align items side-by-side
    alignItems: "center",
    //background: "#18181B", // Dark background
    padding: "0.5rem", // Reduced padding
    borderRadius: "4px", // Smaller border radius for a subtler curve
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // A subtle shadow
    maxWidth: "500px", // Max width for the form
    margin: "auto", // Center the form in the page
}

const inputStyle = {
    flex: "1", // Take up the remaining space
    fontSize: "16px", // Smaller font size
    padding: "0.75rem", // Comfortable padding
    margin: "0", // No margin for the input
    backgroundColor: "#18181B", // Background to match the container
    border: "1px solid #333", // Subtle border
    borderRadius: "12px", // Matching the container's border radius
    color: "#FFF", // Text color
    marginRight: "0.5rem", // Space between input and button
}

const submitButtonStyle = {
    fontSize: "16px", // Matching font size with the input
    padding: "0.75rem 1.5rem", // Padding similar to the input
    backgroundColor: "#2C91ED", // Bright accent color for the button
    color: "#FFF", // Text color
    border: "none", // No border
    borderRadius: "12px", // Matching the container's border radius
    cursor: "pointer", // Cursor for button
    fontWeight: "bold", // Bold font weight for the button text
}

const responseText = {
    textAlign: "center", // Center the response text
    color: "#5FCEAE", // Color for the response message
    fontSize: "16px", // Consistent font size
    marginTop: "1rem", // Space above the response text
}

const labelStyle = {
    textAlign: "center", // Center align text
    color: "#FFF", // Text color
    fontSize: "16px", // Font size
    marginBottom: "1rem", // Space below the label
}
