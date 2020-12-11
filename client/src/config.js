const prod = {
    API_URL: "https://api.total-shit.show",
}

const dev = {
    API_URL: "http://localhost:8000"
};

export const config = process.env.NODE_ENV === "prod" ? prod : dev;