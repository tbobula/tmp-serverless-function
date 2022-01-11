require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("app8g3jawj3S9QjHO")
  .table("survey");

exports.handler = async (event, context) => {
  console.log(event);
  const method = event.httpMethod;

  if (method === "GET") {
    try {
      const { records } = await airtable.list();
      const survey = records.map((item) => {
        const { id } = item;
        const { room, vote } = item.fields;
        return { id, room, vote };
      });
      return {
        statusCode: 200,
        body: JSON.stringify(survey),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "General Server Error",
      };
    }
  }

  if (method === "PUT") {
    try {
      const { id, votes } = JSON.parse(event.body);
      if (!id || !votes) {
        return {
          statusCode: 400,
          body: "Please provide id and votes",
        };
      }

      const fields = { vote: Number(votes) + 1 };
      const item = await airtable.update(id, { fields });
      console.log(item);
      if (item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {}
  }

  // Default Response
  return {
    statusCode: 405,
    body: "Only GET and PUT requests allowed",
  };
};
