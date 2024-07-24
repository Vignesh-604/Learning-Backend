# Video streaming 
Upload a file from the client, process it on the server: create hls format, and then use the resulting video URL to stream the video in chunks as per sequence in index.m3u8 file in your application.

While streaming, check network tab to see how segments are transferred as you watch.
## HLS (HTTP live streaming)
HLS breaks down video files into smaller downloadable HTTP files and delivers them using the HTTP protocol. Client devices load these HTTP files and then play them back as video.

 It works by continually sending the media file to a user's device a little bit at a time instead of all at once. The original media file is stored remotely, or, in the case of live streaming, created in real-time with a remote camera or microphone. This way, the video or audio can play without the user's device downloading the entire file first.

## .m3u8 file
The M3U8 file format is a type of playlist file used by audio and video playback programs to store playlists. It is a Unicode version of the M3U format, hence the ‘8’ in its name. This format is widely used in internet radio and video streaming.

- Does not contain actual audio or video data
- Stores playlists with Internet web paths or URLs, along with information about each track (playtime duration)
- Uses UTF-8 character encoding
- Plain text file that describes the location of audio and video files (file paths or URLs)

## ffmpeg command breakdown
-i ${videoPath}: Input file.
-codec:v libx264: Encode video using H.264 codec.
-codec:a aac: Encode audio using AAC codec.
-hls_time 10: Set each HLS segment to be 10 seconds.
-hls_playlist_type vod: Set the playlist type to VOD (Video on Demand).
-hls_segment_filename "${outputPath}/segment%03d.ts": Define the format and path for the segment files.
-start_number 0: Start segment numbering from 0.
${hlsPath}: Output the HLS playlist file to the specified path.

## video.js