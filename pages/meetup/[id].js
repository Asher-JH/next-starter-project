import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <MeetupDetail
        image={data.image}
        title={data.title}
        address={data.address}
        description={data.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:12345@next-app-project.0q65j.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({ params: { id: meetup._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:12345@next-app-project.0q65j.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const { _id, ...meetup } = await db
    .collection("meetups")
    .findOne({ _id: ObjectId(id) });
  client.close();

  return {
    props: {
      data: {
        ...meetup,
        id: _id.toString(),
      },
    },
  };
};

export default MeetupDetails;
