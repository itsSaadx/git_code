export async function POST(request) {
  const data = await request.json();

  return Response.json({
    message: `Hello ${data.name}, data received!`,
    user: data,
  });
}


// Put api
let user = {
  id: 1,
  name: "Saad",
  age: 22,
};

export async function PUT(request) {
  const data = await request.json();

  user = {
    ...user,
    ...data,
  };

  return Response.json({
    message: "User Updated Successfully",
    user: user,
  });
}

// deltete api

export async function DELETE() {
  user = null;

  return Response.json({
    message: "User Deleted Successfully",
    user: user,
  });
}