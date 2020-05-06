import axios from "axios";
const loginUrl = process.env.VUE_APP_API_URL;

export const state = () => ({
  isLoading: false,
  data: [],
  projectScanData: [],
  individualScanData: []
});
export const mutations = {
  IS_PAGE_LOADING(state, data) {
    state.isLoading = data;
  },
  FETCH_DATA(state, data) {
    state.data = data;
  },
  FETCH_SCAN_DATA_PROJECT(state, data) {
    state.projectScanData = data;
  },
  FETCH_INDIVIDUAL_DATA(state, data) {
    state.individualScanData = data;
  }
};
export const actions = {
  showPageLoading({ commit }, data) {
    commit("IS_PAGE_LOADING", data);
  },
  fetchScanData({ commit }) {
    axios
      .get(loginUrl + "/scan/read", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.success) {
          const scanData = [];
          for (const data of response.data.data) {
            scanData.push({ name: data.name });
          }
          commit("FETCH_DATA", scanData);
          commit("IS_PAGE_LOADING", false);
        }
        commit("PAGE_LOADING", false);
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("PAGE_LOADING", false);
          //   commit("ERROR_MESSAGE", "Invalid credentials");
          //   commit("ERROR_MESSAGE_STATUS", true);
        }
      });
  },
  fetchIndividualScanData({ commit }, payload) {
    axios
      .post(loginUrl + "/scan/read", payload, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.success) {
          const scanData = [];
            scanData.push({
              name: response.data.data.name,
              scan_type: response.data.data.scan_type,
              tool: response.data.data.tool
            });
          // }
          // for (const a of response.data.data)
          commit("FETCH_INDIVIDUAL_DATA", scanData);
          commit("IS_PAGE_LOADING", false);
        }
        commit("PAGE_LOADING", false);
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("PAGE_LOADING", false);
          //   commit("ERROR_MESSAGE", "Invalid credentials");
          //   commit("ERROR_MESSAGE_STATUS", true);
        }
      });
  },
  fetchScanbyProject({ commit }, payload) {
    axios
      .post(loginUrl + "/scan/project", payload, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.success) {
          const scanData = [];
          for (const scan of response.data.data) {
            scanData.push({
              name: scan.name,
              scan_type: scan.scan_type,
              tool: scan.tool
            });
          }
          commit("FETCH_SCAN_DATA_PROJECT", scanData);
          commit("IS_PAGE_LOADING", false);
        }
        commit("PAGE_LOADING", false);
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("PAGE_LOADING", false);
          //   commit("ERROR_MESSAGE", "Invalid credentials");
          //   commit("ERROR_MESSAGE_STATUS", true);
        }
      });
  }
};
export const getters = {
  isPageLoading(state) {
    return state.isLoading;
  },
  getScanCount(state) {
    if (state.data) {
      return state.data.length;
    }
  },
  getScanProjectData(state) {
    if (state.projectScanData) {
      return state.projectScanData;
    }
  },
  getScanIndividualData(state) {
    if (state.individualScanData) {
      return state.individualScanData;
    }
  }
};
