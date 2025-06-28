'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProductReviewsProps {
  productId: string
}

// Mock review data
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'João Silva',
      avatar: '/api/placeholder/40/40',
      verified: true,
    },
    rating: 5,
    title: 'Excelente produto!',
    comment:
      'Superou minhas expectativas. A qualidade é excepcional e chegou bem rápido. Recomendo!',
    helpful: 12,
    notHelpful: 1,
    date: '2024-01-10',
    verified_purchase: true,
  },
  {
    id: '2',
    user: {
      name: 'Maria Santos',
      avatar: '/api/placeholder/40/40',
      verified: true,
    },
    rating: 4,
    title: 'Muito bom, mas pode melhorar',
    comment:
      'Produto de boa qualidade, porém achei um pouco caro pelo que oferece. Atendeu às expectativas.',
    helpful: 8,
    notHelpful: 2,
    date: '2024-01-08',
    verified_purchase: true,
  },
  {
    id: '3',
    user: {
      name: 'Pedro Oliveira',
      avatar: '/api/placeholder/40/40',
      verified: false,
    },
    rating: 5,
    title: 'Perfeito!',
    comment:
      'Exatamente como descrito. Entrega rápida e produto em perfeitas condições.',
    helpful: 15,
    notHelpful: 0,
    date: '2024-01-05',
    verified_purchase: true,
  },
]

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>(
    'newest'
  )

  const ratingStats = {
    average: 4.6,
    total: 247,
    distribution: {
      5: 156,
      4: 67,
      3: 18,
      2: 4,
      1: 2,
    },
  }

  const filteredReviews = mockReviews.filter(review =>
    filterRating ? review.rating === filterRating : true
  )

  return (
    <div className="mt-16 space-y-8">
      <div className="border-b border-gray-200 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Avaliações dos Clientes
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Overview */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {ratingStats.average}
              </div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(ratingStats.average)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Baseado em {ratingStats.total} avaliações
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const count =
                  ratingStats.distribution[
                    rating as keyof typeof ratingStats.distribution
                  ]
                const percentage = (count / ratingStats.total) * 100

                return (
                  <button
                    key={rating}
                    onClick={() =>
                      setFilterRating(filterRating === rating ? null : rating)
                    }
                    className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${
                      filterRating === rating
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
          {filterRating && (
            <Badge variant="outline" className="flex items-center gap-1">
              {filterRating} estrelas
              <button
                onClick={() => setFilterRating(null)}
                className="ml-1 hover:text-gray-600"
              >
                ×
              </button>
            </Badge>
          )}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Mais Recentes</option>
          <option value="oldest">Mais Antigas</option>
          <option value="helpful">Mais Úteis</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={review.user.avatar}
                alt={review.user.name}
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      {review.user.name}
                    </h4>
                    {review.verified_purchase && (
                      <Badge variant="secondary" className="text-xs">
                        Compra Verificada
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {review.title && (
                  <h5 className="font-medium text-gray-900 mb-2">
                    {review.title}
                  </h5>
                )}

                <p className="text-gray-700 mb-4">{review.comment}</p>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Esta avaliação foi útil?
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Sim ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      Não ({review.notHelpful})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Carregar Mais Avaliações</Button>
      </div>
    </div>
  )
}
