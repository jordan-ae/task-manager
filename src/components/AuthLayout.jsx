function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">

                <h2 className="text-2xl font-bold text-gray-800">Login Here</h2>

                <p className="text-sm text-gray-500 mb-6">
                    Make-SURE Login
                    </p>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;