'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    router.push(`/products?${params.toString()}`)
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, 'dots1')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('dots2', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()
  const itemsPerPage = 20
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Results Info */}
      <div className="text-sm text-gray-600">
        Exibindo {startItem}-{endItem} de {totalItems} produtos
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => {
            if (page === 'dots1' || page === 'dots2') {
              return (
                <div key={`dots-${index}`} className="px-3 py-2">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              )
            }

            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(pageNumber)}
                className={`min-w-[40px] ${
                  isCurrentPage
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-600">Ir para página:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          defaultValue={currentPage}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const page = parseInt((e.target as HTMLInputElement).value)
              if (page >= 1 && page <= totalPages) {
                goToPage(page)
              }
            }
          }}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-600">de {totalPages}</span>
      </div>
    </div>
  )
}
