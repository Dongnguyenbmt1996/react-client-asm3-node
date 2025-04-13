const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper function để xử lý response
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
};

const authService = {
  /**
   * Đăng nhập người dùng
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object, token: string}>}
   */
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Nếu dùng cookie
    });

    const data = await handleResponse(response);

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  },

  /**
   * Đăng xuất - Xóa token
   */
  logout: () => {
    localStorage.removeItem("authToken");
    // Gọi API logout nếu cần
    // return fetch(`${API_URL}/auth/logout`, { method: 'POST' });
  },

  /**
   * Lấy thông tin user hiện tại từ token
   * @returns {object|null} User object hoặc null nếu không đăng nhập
   */
  getCurrentUser: () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  /**
   * Lấy headers authorization
   * @returns {object} Headers chứa token
   */
  getAuthHeaders: () => {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  /**
   * Đăng ký tài khoản mới
   * @param {object} userData
   * @returns {Promise<{user: object}>}
   */
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  /**
   * Refresh token (nếu cần)
   */
  refreshToken: async () => {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include", // Cho JWT httpOnly cookie
    });

    const data = await handleResponse(response);

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  },
};

export default authService;
