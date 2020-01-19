async function getCurrentTasks(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/points/tasks"
    : /* Client */ "/api/points/tasks";
  console.log(urlRoute);
  const results = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  console.log(results);
  return await results.json();
}

// CAN only be called from the client
async function saveTask(newTask) {
  const urlRoute = "/api/points/tasks";
  console.log(urlRoute);
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ ...newTask, blocking: false, description: "" })
  });

  console.log(result);
  return result.status === 200;
}

//TODO: More complex since we actually then have to delete recursively, since it could potentially
// Break FK constraints
async function deleteTask(taskId) {
  const urlRoute = "/api/points/tasks/" + taskId;
  console.log(urlRoute);
  const result = await fetch(urlRoute, {
    method: "DELETE"
  });
  const jsonresult = await result.json();
  console.log(jsonresult);
  return result.status === 200;
}

export { getCurrentTasks, saveTask, deleteTask };
