import { AxiosClient } from "..";

describe("CRUD Operations with JsonPlaceholder server", () => {
    // Configure AxiosClient for testing
    const client = new AxiosClient({
        config: {
            baseURL: "https://jsonplaceholder.typicode.com",
            timeout: 20000, // increase to 20s, for some reason jest fails for low timeouts
        },
        aliases: {
            posts: "/posts",
            post: "/posts/:id",
        },
    });

    it("should read posts (GET)", async () => {
        const res = await client.get("posts", undefined);
        expect(res.status).toBe(200);
    }, 20000);
    it("should create post (POST)", async () => {
        const res = await client.post("posts", { name: "hello world" });
        expect(res.status).toBe(201);
    }, 20000);
    it("should update post (PUT)", async () => {
        const res = await client.put("post", { id: 1, name: "hello" });
        expect(res.status).toBe(200);
    }, 20000);
    it("should delete post (DELETE)", async () => {
        const res = await client.delete("post", { id: 1 });
        expect(res.status).toBeCloseTo(200); // jsonplaceholder returns 200 for DELETE instead of 204
    }, 20000);
});
