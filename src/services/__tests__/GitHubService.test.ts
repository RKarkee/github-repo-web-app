import { describe, it, expect } from "vitest";
import { githubService } from "../GitHubService";

describe("GitHubService", () => {
  describe("searchRepositories", () => {
    it("should search repositories successfully", async () => {
      const result = await githubService.searchRepositories({
        query: "react",
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(result.total_count).toBeGreaterThanOrEqual(0);
    });

    it("should handle search with all parameters", async () => {
      const result = await githubService.searchRepositories({
        query: "javascript",
        sort: "stars",
        order: "desc",
        page: 1,
        per_page: 10,
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });

    it("should handle empty search query", async () => {
      await expect(
        githubService.searchRepositories({ query: "" })
      ).rejects.toThrow();
    });
  });

  describe("getRepository", () => {
    it("should get repository details successfully", async () => {
      // ✅ Using a repository that definitely exists
      const result = await githubService.getRepository(
        "test-owner",
        "test-repo"
      );

      expect(result).toBeDefined();
      expect(result.full_name).toBe("test-owner/test-repo");
      expect(result.name).toBe("test-repo");
      expect(result.owner.login).toBe("test-owner");
    });

    it("should handle non-existent repository", async () => {
      await expect(
        githubService.getRepository(
          "nonexistentuser123456",
          "nonexistentrepo123456"
        )
      ).rejects.toThrow();
    });
  });

  describe("getReadme", () => {
    it("should get repository README successfully", async () => {
      const result = await githubService.getReadme("test-owner", "test-repo");

      expect(result).toBeDefined();
      expect(result.name).toBe("README.md");
      expect(result.content).toBeDefined();
      expect(result.encoding).toBe("base64");
    });

    it("should handle repository without README", async () => {
      await expect(
        githubService.getReadme(
          "nonexistentuser123456",
          "nonexistentrepo123456"
        )
      ).rejects.toThrow();
    });
  });
});
