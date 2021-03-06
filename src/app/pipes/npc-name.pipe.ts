import {Pipe, PipeTransform} from '@angular/core';
import {LocalizedDataService} from '../core/data/localized-data.service';
import {I18nName} from '../model/list/i18n-name';

@Pipe({
    name: 'npcName'
})
export class NpcNamePipe implements PipeTransform {

    constructor(private data: LocalizedDataService) {
    }

    transform(id: number): I18nName {
        return this.data.getNpc(id);
    }

}
