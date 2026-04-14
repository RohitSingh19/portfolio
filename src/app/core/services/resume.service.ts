import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ResumePDF {
  url: string;
  fileName: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  
  convertGoogleDriveLink(shareLink: string): ResumePDF {
    try {
      // Extract file ID from the share link
      const fileIdMatch = shareLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
      
      if (!fileIdMatch || !fileIdMatch[1]) {
        throw new Error('Invalid Google Drive link format');
      }

      const fileId = fileIdMatch[1];

      return {
        // Use preview URL for embedding in iframe
        url: `https://drive.google.com/file/d/${fileId}/preview`,
        // Use direct download URL
        fileName: fileId,
        title: 'Resume'
      };
    } catch (error) {
      console.error('Error parsing Google Drive link:', error);
      throw error;
    }
  }

  /**
   * Get direct download URL from Google Drive file ID
   */
  getDownloadUrl(googleDriveLink: string): string {
    try {
      const fileIdMatch = googleDriveLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!fileIdMatch || !fileIdMatch[1]) {
        throw new Error('Invalid Google Drive link format');
      }
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
    } catch (error) {
      console.error('Error generating download URL:', error);
      throw error;
    }
  }

  /**
   * Load resume from Google Drive URL
   * @param googleDriveShareLink - Public share link from Google Drive
   */
  getResume(googleDriveShareLink: string): Observable<ResumePDF> {
    try {
      const resumePdf = this.convertGoogleDriveLink(googleDriveShareLink);
      return of(resumePdf);
    } catch (error) {
      console.error('Failed to get resume:', error);
      throw error;
    }
  }

  /**
   * Trigger download of resume from Google Drive
   * @param googleDriveShareLink - Public share link from Google Drive
   * @param fileName - Name for the downloaded file
   */
  downloadResume(googleDriveShareLink: string, fileName: string = 'Resume.pdf'): void {
    try {
      const downloadUrl = this.getDownloadUrl(googleDriveShareLink);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Unable to download resume. Please check the Google Drive link.');
    }
  }
}
