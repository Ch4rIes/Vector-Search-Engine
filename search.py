import string 
import nltk
from nltk.tokenize import TreebankWordTokenizer
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class SearchEngine: 
    def __init__(self , docs):
        #setting up the vector engine basing on the given documents
        self.docs = docs
        self.REMOVE_PUNCTUATION_TABLE = str.maketrans({x: None for x in string.punctuation})
        self.TOKENIZER = TreebankWordTokenizer()
        self.STEMMER = PorterStemmer()
        #define function for tokenizing the documents
        def tokenize_and_stem(s):
            return [self.STEMMER.stem(t) for t in self.TOKENIZER.tokenize(s.translate(self.REMOVE_PUNCTUATION_TABLE))]
        self.vectorizer = TfidfVectorizer(tokenizer=tokenize_and_stem, stop_words='english')
        self.vectorizer.fit(docs)
        #convert documents into vectors
        self.doc_vectors = self.vectorizer.transform(docs)

    def search(self , query):
        #transform the query string to vector
        query_vector = self.vectorizer.transform([query])
        #generate an array of similarity to each of the documents
        similarity = cosine_similarity(query_vector, self.doc_vectors)
        temp = [[i , similarity[0][i]] for i in range(0 , len(self.docs))]
        sorted_temp = sorted(temp, key=lambda x: x[1])
        print(sorted_temp)
        return [self.docs[sorted_temp[-1][0]] , self.docs[sorted_temp[-2][0]] , self.docs[sorted_temp[-3][0]]]
