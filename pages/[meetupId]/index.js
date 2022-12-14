import Head from 'next/head'
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://abuelvas:WCMDnDhyf8BdxFjx@cluster0.yrdy19o.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find({})
    .project({ _id: 1 })
    .toArray();

  client.close();

  //console.log(meetups)

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://abuelvas:WCMDnDhyf8BdxFjx@cluster0.yrdy19o.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  //console.log(selectedMeetup)

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetupDetails;
