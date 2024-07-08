interface RequestParams {
  segments: string;
}

function getNextSegment(params: RequestParams): string {
  const rootSegment = params.segments.split('/')[0];
  const newSegments = params.segments.split('/').slice(1).join('/');
  params.segments = newSegments;

  return rootSegment;
}

export default getNextSegment;