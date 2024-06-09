# HTTP : Hypertext transfer protocol

## HTTP Headers
- meta data : key-value pair sent along with req & res
- used for: caching, authentication, manage state
- Types of headers:
    - Request headers: Data from client
    - Response headers: Data from server
    - Representation headers: Encoding/ compression
    - Payload headers - data

### Most common headers
- Accept: application/json
- User-Agent : Info about the sender (browser details,etc)
- Authorization
- Content_type
- Cookies
- Cache control
- CORS and Security headers

## HTTP methods
Set of operations to interact with server
- GET: Retrive data/ resource
- POST: Interact with resource
- HEAD: No message body (only headers)
- OPTIONS: Options available
- TRACE: loopback test/ debugging
- DELETE: Remove data/ resource
- PUT: Replace a data/resource
- PATCH: Edit a part of data

## HTTP Status code
- 1xx : Informational
- 2xx : Success
- 3xx : Redirecction
- 4xx : Client error
- 5xx : Server error
