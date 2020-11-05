async function getCurrentTasks(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/points/tasks"
    : /* Client */ "/api/points/tasks";
  const results = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await results.json();
}

// CAN only be called from the client
async function saveTask(newTask) {
  const urlRoute = "/api/points/tasks";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      ...newTask,
      blocking: false,
      description: "",
      isPast: 0
    })
  });
  return result.status === 200;
}

async function updateTask(updatedTask) {
  const urlRoute = "/api/points/tasks";
  if (!updatedTask.createdAt) {
    updatedTask.createdAt = new Date().toISOString();
  }
  const result = await fetch(urlRoute, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  });
  const jsonBody = await result.json();
  return result.status === 200;
}

async function deleteTask(task) {
  const urlRoute = `/api/points/tasks/${task.id}`;
  const result = await fetch(urlRoute, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  });
  return result.status === 200;
}

async function getHouses(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/person/houses"
    : /* Client */ "/api/person/houses";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}

// Should be of the form
// { name: name, color: #..... }
async function createHouse(houseObj) {
  const urlRoute = "/api/person/houses/";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(houseObj)
  });
  return result.status === 200;
}

async function updateHouse(houseObj) {
  const urlRoute = "/api/person/houses/";
  const result = await fetch(urlRoute, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(houseObj)
  });
  return result.status === 200;
}

async function getCurrentUnlockables(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/unlockable"
    : /* Client */ "api/unlockable";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}
async function getCurrentEvents(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/event/"
    : /* Client */ "/api/event/";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}

async function saveUnlockable(newUnlockable) {
  const urlRoute = "/api/unlockable";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUnlockable)
  });
  const jsonResult = await result.json();
  return result.status === 200;
}
async function updateUnlockable(updatedUnlockable) {
  const urlRoute = "/api/unlockable";
  const result = await fetch(urlRoute, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedUnlockable)
  });
  return result.status === 200;
}

async function saveEvent(newEvent) {
  const urlRoute = "/api/event";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newEvent)
  });
  return result.status === 200;
}
async function deleteEvent(event) {
  const urlRoute = "/api/event/" + event.id;
  const result = await fetch(urlRoute, {
    method: "DELETE"
  });
  return result.status === 200;
}

export {
  getCurrentTasks,
  saveTask,
  updateTask,
  deleteTask,
  getHouses,
  createHouse,
  updateHouse,
  getCurrentUnlockables,
  saveUnlockable,
  updateUnlockable,
  getCurrentEvents,
  saveEvent,
  deleteEvent
};
