import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '@/services/blog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  created_at: string | null;
  image_url?:string;
}

export const BlogRead: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleFetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const blogData = await fetchBlogs();
      setBlogs(blogData || []);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadFullArticle = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
  };

  useEffect(() => {
    handleFetchBlogs();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...' 
      : content;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="text-red-500 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unable to Load Articles</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={handleFetchBlogs} className="w-full bg-primary hover:bg-primary/90">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="text-gray-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Articles Yet</h3>
              <p className="text-gray-600 mb-6">
                We're working on bringing you amazing content. Check back soon for the latest articles and insights!
              </p>
              <Button onClick={handleFetchBlogs} variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // display the blog which was selected in full screen
  if (selectedBlog) {
    return (
      <div className="container mx-auto px-1 max-w-6xl">
        <Button 
          onClick={handleBackToList}
          variant="outline" 
          className="mb-6 flex items-center gap-2 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Button>
        
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedBlog.author_id ? `Author ${selectedBlog.author_id.slice(0, 8)}` : 'GoBuild Team'}
                </p>
                               <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedBlog.created_at)}
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 leading-tight">
              {selectedBlog.title || 'Untitled Blog Post'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {selectedBlog.image_url && (
              <div className="mb-8">
                <img 
                  src={selectedBlog.image_url} 
                  alt="Blog Image" 
                  className="w-full h-70 object-cover rounded-lg"
                />
              </div>
            )}
                        <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button 
                onClick={handleBackToList}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Articles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {blog.author_id ? `Author ${blog.author_id.slice(0, 8)}` : 'GoBuild Team'}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(blog.created_at)}</p>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                {blog.title || 'Untitled Blog Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <img src={blog.image_url} alt="Blog Image" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                {truncateContent(blog.content)}
              </p>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300" onClick={()=>handleReadFullArticle(blog)}
              >
                Read Full Article
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Load More button at the bottom */}
      <div className="mt-12 text-center">
        <Button 
          onClick={handleFetchBlogs} 
          variant="outline" 
          disabled={loading}
          className="px-8 py-3 bg-white hover:bg-primary hover:text-white transition-all duration-300"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Load More Articles'}
        </Button>
      </div>
    </div>
  );
};
