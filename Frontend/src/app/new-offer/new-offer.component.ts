import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent {
  offertaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.offertaForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizioneBreve: ['', Validators.required],
      azienda: ['', Validators.required],
      provincia: ['', Validators.required],
      smartWorking: [null, Validators.required],
      retribuzioneLordo: [null, [Validators.required, Validators.min(0)]],
      tipologiaContratto: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.offertaForm.valid) {
      this.http.post('http://localhost:3001/api/offerte', this.offertaForm.value).subscribe({
        next: (response) => {
          console.log('Offerta aggiunta:', response);
          alert('Offerta aggiunta con successo!');
          this.offertaForm.reset();
        },
        error: (err) => {
          console.error('Errore durante l\'aggiunta:', err);
          alert('Errore durante l\'aggiunta dell\'offerta');
        }
      });
    } else {
      alert('Compila tutti i campi correttamente.');
    }
  }
}
