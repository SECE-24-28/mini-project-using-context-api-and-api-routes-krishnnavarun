import { NextRequest, NextResponse } from "next/server";
import { Feedback } from "@/types/feedbacks";
let feedbacks: Feedback[] = [
  {
    id: 1,
    message: "very good",
  },
  {
    id: 2,
    message: "worst",
  },
  {
    id: 3,
    message: "Excellent",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: feedbacks,
  });
}


export async function POST(request: NextRequest) {
  const body = await request.json();

  const newFeedback: Feedback = {
    id: feedbacks.length + 1,
    message: body.department,
  };

  feedbacks.push(newFeedback);

  return NextResponse.json(
    {
      success: true,
      message: "Feedback added successfully",
      data: newFeedback,
    },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  const body = await request.json();

  const feedbackIndex = feedbacks.findIndex(
    (feedback) => feedback.id === id
  );

  if (feedbackIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: "Feedback not found",
      },
      { status: 404 }
    );
  }

  feedbacks[feedbackIndex] = {
    ...feedbacks[feedbackIndex],
    ...body,
  };

  return NextResponse.json({
    success: true,
    message: "Feedback updated successfully",
    data: feedbacks[feedbackIndex],
  });
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  const body = await request.json();

  const feedbackIndex = feedbacks.findIndex(
    (feedback) => feedback.id === id
  );

  if (feedbackIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: "Feedback not found",
      },
      { status: 404 }
    );
  }

  feedbacks[feedbackIndex] = {
    ...feedbacks[feedbackIndex],
    ...body,
  };

  return NextResponse.json({
    success: true,
    message: "Feedback updated successfully",
    data: feedbacks[feedbackIndex],
  });
}

export async function DELETE(request : NextRequest){
  const body = await request.json();

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    return feedback.id !== body.id;
  })

  feedbacks = [...filteredFeedbacks];

  return NextResponse.json({
    success : true,
    status : 204,
    message : "Feedback deleted successfully"
  })
}