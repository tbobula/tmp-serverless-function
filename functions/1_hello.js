// domain/.netlify/functions/1_hello

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Our First Netlify Example",
  };
};
