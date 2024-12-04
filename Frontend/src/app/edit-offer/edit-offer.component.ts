import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrl: './edit-offer.component.css'
})
export class EditOfferComponent implements OnInit {
  editOfferForm: FormGroup;
  offer: any = null; // Memorizza i dati dell'offerta corrente
  offerId: string = ''; // Memorizza l'ID

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute // Aggiungi ActivatedRoute per ottenere l'ID dalla URL
  ) {
    this.editOfferForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizioneBreve: ['', Validators.required],
      azienda: ['', Validators.required],
      provincia: ['', Validators.required],
      smartWorking: [false, Validators.required],
      retribuzioneLordo: ['', [Validators.required, Validators.min(0)]],
      tipologiaContratto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Ottieni l'ID dalla route
    this.offerId = this.route.snapshot.paramMap.get('id')!;
    this.loadOffer();
  }

  // Carica l'offerta tramite ID dalla URL
  loadOffer() {
    if (this.offerId) {
      this.http.get(`http://localhost:3001/api/offerte/${this.offerId}`).subscribe(
        (response: any) => {
          this.offer = response; // Salva l'offerta recuperata
          this.editOfferForm.patchValue(response); // Precompila il form
        },
        (error) => {
          console.error('Errore durante il recupero dell\'offerta:', error);
          alert('Offerta non trovata!');
          this.offer = null;
        }
      );
    }
  }

  // Salva le modifiche
  onSubmit() {
    if (this.editOfferForm.valid) {
      this.http.put(`http://localhost:3001/api/offerte/${this.offerId}`, this.editOfferForm.value).subscribe(
        () => {
          alert('Offerta modificata con successo!');
          this.editOfferForm.reset();
          this.offer = null;
          this.offerId = '';
        },
        (error) => {
          console.error('Errore durante la modifica:', error);
          alert('Errore durante la modifica dell\'offerta.');
        }
      );
    } else {
      alert('Compila tutti i campi!');
    }
  }
}