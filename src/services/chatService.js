// Import authService đúng cách (nếu dùng ES Modules)
import authService from "./authService";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const chatService = {
  /**
   * Lấy danh sách phòng chat (cho consultant/admin)
   * @returns {Promise<Array>} Danh sách phòng chat
   */
  getActiveRooms: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch rooms");
      }

      return await response.json();
    } catch (error) {
      console.error("[chatService] getActiveRooms error:", error);
      throw error;
    }
  },

  /**
   * Tạo phòng chat mới (cho customer)
   * @returns {Promise<{roomId: string}>} ID phòng chat mới
   */
  createRoom: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create room");
      }

      return await response.json();
    } catch (error) {
      console.error("[chatService] createRoom error:", error);
      throw error;
    }
  },

  /**
   * Lấy tin nhắn trong phòng
   * @param {string} roomId
   * @returns {Promise<Array>} Danh sách tin nhắn
   */
  getRoomMessages: async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/messages/${roomId}`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch messages");
      }

      return await response.json();
    } catch (error) {
      console.error("[chatService] getRoomMessages error:", error);
      throw error;
    }
  },

  /**
   * Gửi tin nhắn
   * @param {string} roomId
   * @param {string} content
   * @returns {Promise<{message: object}>} Tin nhắn vừa gửi
   */
  sendMessage: async (roomId, content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/messages`, {
        method: "POST",
        headers: {
          ...authService.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("[chatService] sendMessage error:", error);
      throw error;
    }
  },

  /**
   * Kết thúc chat
   * @param {string} roomId
   * @returns {Promise<{success: boolean}>}
   */
  endChat: async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/end-chat/${roomId}`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to end chat");
      }

      return await response.json();
    } catch (error) {
      console.error("[chatService] endChat error:", error);
      throw error;
    }
  },
};

export default chatService;
