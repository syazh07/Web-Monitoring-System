const BASE_URL =
  "http://localhost:5001";

export async function
startMonitoring(url) {

  try {

    const response =
      await fetch(
        `${BASE_URL}/monitor`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            url,
          }),
        }
      );

    return await response.json();

  } catch (error) {

    console.log(error);

    return {
      success: false,
      metrics: [],
    };

  }

}

export async function
getHistory() {

  try {

    const response =
      await fetch(
        `${BASE_URL}/history`
      );

    return await response.json();

  } catch (error) {

    console.log(error);

    return [];

  }

}

export async function
compareSessions(
  session1,
  session2
) {

  try {

    const response =
      await fetch(
        `${BASE_URL}/compare/${session1}/${session2}`
      );

    return await response.json();

  } catch (error) {

    console.log(error);

    return {
      success: false,
    };

  }

}