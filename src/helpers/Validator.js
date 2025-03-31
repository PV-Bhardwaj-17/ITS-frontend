export const validate = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d+$/.test(formData.mobile)) {
        newErrors.mobile = "Mobile number must contain only digits.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
    }
    if (!formData.college.trim()) newErrors.college = "College is required.";
    if (!formData.password.trim()) {
        newErrors.password = "Password is required.";
    } else if (
        formData.password.length < 8 ||
        !/[A-Z]/.test(formData.password) || // At least one uppercase letter
        !/[a-z]/.test(formData.password) || // At least one lowercase letter
        !/\d/.test(formData.password) || // At least one digit
        !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) // At least one special character
    ) {
        newErrors.password =
            "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}