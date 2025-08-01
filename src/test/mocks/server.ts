import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { mockSearchResponse, mockRepository, mockReadme } from './mockData'

export const handlers = [
  // Mock repository search
  http.get('https://api.github.com/search/repositories', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')

    if (!query) {
      return HttpResponse.json({ message: 'Validation Failed' }, { status: 422 })
    }

    return HttpResponse.json(mockSearchResponse)
  }),

  // Mock single repository
  http.get('https://api.github.com/repos/:owner/:repo', ({ params }) => {
    const { owner, repo } = params
    
    if (owner === 'test-owner' && repo === 'test-repo') {
      return HttpResponse.json(mockRepository)
    }
    
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
  }),

  // Mock repository README
  http.get('https://api.github.com/repos/:owner/:repo/readme', ({ params }) => {
    const { owner, repo } = params
    
    if (owner === 'test-owner' && repo === 'test-repo') {
      return HttpResponse.json(mockReadme)
    }
    
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
  }),
]

export const server = setupServer(...handlers)